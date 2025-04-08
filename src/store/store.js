import { create } from 'zustand';

export const useAudioStore = create((set) => ({
  files: [],
  playingIndex: null,

  setFiles: (newFiles) => set({ files: newFiles }),

  addFiles: (newFiles) =>
    set((state) => ({
      files: [...state.files, ...newFiles],
    })),

  removeFile: (indexToRemove) =>
    set((state) => {
      const newFiles = state.files.filter((_, index) => index !== indexToRemove);
      return {
        files: newFiles,
        playingIndex: state.playingIndex === indexToRemove ? null : state.playingIndex,
      };
    }),

  clearFiles: () => set({ files: [] }), // Теперь clearFiles находится вне removeFile

  setPlayingIndex: (index) => set({ playingIndex: index }),
}));
