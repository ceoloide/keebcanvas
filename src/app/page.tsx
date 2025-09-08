'use client';

import { useState } from 'react';
import { LayoutView } from '../components/LayoutView';
import { YamlDownloadButton } from '../components/YamlDownloadButton';
import { PropertyEditor } from '../components/PropertyEditor';
import { PreviewView } from '../components/PreviewView';
import { LayoutSelectionView } from '../components/LayoutSelectionView';

type View = 'initial' | 'layout-selection' | 'layout-editor';

export default function Home() {
  const [view, setView] = useState<View>('initial');
  const [layout, setLayout] = useState<string | null>(null);

  const handleSelectLayout = (layoutName: string) => {
    setLayout(layoutName);
    setView('layout-editor');
  };

  if (view === 'layout-editor') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
            Keeb Canvas
          </p>
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <YamlDownloadButton />
          </div>
        </div>

        <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
          <LayoutView />
        </div>

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-2 lg:text-left">
          <PropertyEditor />
          <PreviewView />
        </div>
      </main>
    );
  }

  if (view === 'layout-selection') {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <LayoutSelectionView onSelectLayout={handleSelectLayout} />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Create a new keyboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border rounded-lg cursor-pointer" onClick={() => setView('layout-selection')}>
            <h2 className="text-2xl font-bold mb-4">Split Keyboard</h2>
            <p>Start with a pre-defined split keyboard layout.</p>
          </div>
          <div className="p-8 border rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Unibody</h2>
            <p>Start with a pre-defined unibody keyboard layout.</p>
          </div>
          <div className="p-8 border rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Custom</h2>
            <p>Start from a blank canvas to create a custom layout.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
