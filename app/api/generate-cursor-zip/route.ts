import { NextRequest, NextResponse } from 'next/server';
import archiver from 'archiver';
import { Readable } from 'stream';
import { 
  generateZipStructure, 
  generateZipFilename, 
  type ZipRequest 
} from '@/utils/cursor-zip-generator';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: ZipRequest = await request.json();
    
    // Validate required fields
    if (!body.prd || typeof body.prd !== 'string') {
      return NextResponse.json(
        { error: 'PRD content is required and must be a string' },
        { status: 400 }
      );
    }
    
    if (!Array.isArray(body.rules)) {
      return NextResponse.json(
        { error: 'Rules must be an array' },
        { status: 400 }
      );
    }
    
    // Validate each rule
    for (const rule of body.rules) {
      if (!rule.filename || !rule.content) {
        return NextResponse.json(
          { error: 'Each rule must have filename and content' },
          { status: 400 }
        );
      }
    }
    
    // Generate the zip structure
    const zipStructure = generateZipStructure(body);
    
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
    
    // Generate filename
    const filename = generateZipFilename('cursor-project');
    
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
