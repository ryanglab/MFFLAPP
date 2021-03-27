export const getFranchiseTitle = (franchises, slug) => {
  if (franchises && slug) {
    const franchise = franchises.filter((f) => {
      return f.slug === slug;
    });
    return (franchise.length) ? `${franchise[0].team} ${franchise[0].name}` : 'Franchise';
  }
};