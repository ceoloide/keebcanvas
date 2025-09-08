"use client";

import React from 'react';
import { useStore } from '../store/store';

export const YamlDownloadButton = ({ useStore: useStoreFromProps }: { useStore?: any }) => {
  const actualUseStore = useStoreFromProps || useStore;
  const generateYaml = actualUseStore((state: any) => state.generateYaml);

  const handleDownload = () => {
    const yamlString = generateYaml();
    const blob = new Blob([yamlString], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'layout.yaml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return <button onClick={handleDownload}>Download YAML</button>;
};
