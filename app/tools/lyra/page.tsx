import LyraOptimizerComponent from '@/components/LyraOptimizer';

export default function LyraPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <LyraOptimizerComponent />
    </div>
  );
}

export const metadata = {
  title: 'Lyra AI Prompt Optimizer | Hello Computer',
  description: 'Transform vague requests into precision-crafted prompts that unlock AI\'s full potential across all platforms.',
};

