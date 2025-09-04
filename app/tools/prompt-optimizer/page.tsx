import PromptOptimizerComponent from '@/components/PromptOptimizer';

export default function PromptOptimizerPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <PromptOptimizerComponent />
    </div>
  );
}

export const metadata = {
  title: 'AI Prompt Optimizer | Hello Computer',
  description: 'Transform vague requests into precision-crafted prompts that unlock AI\'s full potential across all platforms.',
};

