const xpPerLvl = 500;


export const formatLvl = (experience: number): number => {
    return Math.floor(experience / xpPerLvl) + 1;
};

export const getMaxLevel = (experience: number): number => {
    const currentLevel = Math.floor(experience / xpPerLvl);
    return (currentLevel + 1) * xpPerLvl;
};

export const calculateProgressBar = (experience: number) => {
    return (experience % 500 / 500) * 100;
  };