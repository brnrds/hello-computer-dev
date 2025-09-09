import { NextRequest, NextResponse } from 'next/server';
import archiver from 'archiver';
import { Readable } from 'stream';
import { 
  generateZipStructure, 
  generateBlueprintStructure,
  generateZipFilename, 
  type ZipRequest,
  type BlueprintRequest 
} from '@/utils/cursor-zip-generator';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Determine if this is a new BlueprintRequest or legacy ZipRequest
    const isBlueprintRequest = 'projectName' in body;
    
    let zipStructure: { files: Array<{ path: string; content: string }> };
    let filename: string;
    
    if (isBlueprintRequest) {
      // Handle new BlueprintRequest
      const blueprintBody = body as BlueprintRequest;
      
      // Validate required fields for blueprint
      if (!blueprintBody.projectName || typeof blueprintBody.projectName !== 'string' || !blueprintBody.projectName.trim()) {
        return NextResponse.json(
          { error: 'Project name is required and must be a non-empty string' },
          { status: 400 }
        );
      }
      
      // prdContent is optional - will use template if empty
      if (blueprintBody.prdContent !== undefined && typeof blueprintBody.prdContent !== 'string') {
        return NextResponse.json(
          { error: 'PRD content must be a string if provided' },
          { status: 400 }
        );
      }
      
      // Validate optional arrays
      if (blueprintBody.adrSeedDecisions && !Array.isArray(blueprintBody.adrSeedDecisions)) {
        return NextResponse.json(
          { error: 'ADR seed decisions must be an array if provided' },
          { status: 400 }
        );
      }
      
      if (blueprintBody.folderStructureSpec && !Array.isArray(blueprintBody.folderStructureSpec)) {
        return NextResponse.json(
          { error: 'Folder structure spec must be an array if provided' },
          { status: 400 }
        );
      }
      
      // Generate the blueprint structure
      zipStructure = generateBlueprintStructure(blueprintBody);
      filename = generateZipFilename(blueprintBody.projectName);
      
    } else {
      // Handle legacy ZipRequest for backward compatibility
      const legacyBody = body as ZipRequest;
      
      // Validate required fields for legacy request
      if (!legacyBody.prd || typeof legacyBody.prd !== 'string') {
        return NextResponse.json(
          { error: 'PRD content is required and must be a string' },
          { status: 400 }
        );
      }
      
      if (!Array.isArray(legacyBody.rules)) {
        return NextResponse.json(
          { error: 'Rules must be an array' },
          { status: 400 }
        );
      }
      
      // Validate each rule
      for (const rule of legacyBody.rules) {
        if (!rule.filename || !rule.content) {
          return NextResponse.json(
            { error: 'Each rule must have filename and content' },
            { status: 400 }
          );
        }
      }
      
      // Generate the legacy zip structure
      zipStructure = generateZipStructure(legacyBody);
      filename = generateZipFilename('cursor-project');
    }
    
    // Create a readable stream for the response
    const stream = new ReadableStream({
      start(controller) {
        // Create archiver instance
        const archive = archiver('zip', {
          zlib: { level: 9 } // Maximum compression
        });
        
        // Handle archiver events
        archive.on('error', (err) => {
          console.error('Archive error:', err);
          controller.error(err);
        });
        
        archive.on('end', () => {
          controller.close();
        });
        
        // Pipe archive data to the controller
        archive.on('data', (chunk) => {
          controller.enqueue(new Uint8Array(chunk));
        });
        
        // Add files to the archive
        zipStructure.files.forEach(file => {
          archive.append(file.content, { name: file.path });
        });
        
        // Finalize the archive
        archive.finalize();
      }
    });
    
    // Return the streaming response
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-cache',
      },
    });
    
  } catch (error) {
    console.error('Error generating zip:', error);
    return NextResponse.json(
      { error: 'Failed to generate zip file' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS if needed
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
