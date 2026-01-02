export default {
  '**/*.{js,jsx,ts,tsx,json,css,scss,md,yaml,yml}': (filenames) => {
    // 过滤掉 lock.yaml 文件
    const filtered = filenames.filter((file) => !file.includes('lock.yaml'));
    if (filtered.length === 0) {
      return [];
    }
    return filtered.map((file) => `prettier --write "${file}"`);
  },
};
