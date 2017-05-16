
export default function validateLanguage(data) {
  let summary = {
    categories: Object.keys(data).filter(it => it !== 'name'),
  };

  const errors = [];

  summary.categories.forEach(cat => {
    const elements = Object.keys(data[cat]);
    elements.forEach(el => {
      const item = data[cat][el];
      if (item.name === undefined) {
        errors.push(`Item has not a name: ${el}`);
      } else if (item.description === undefined) {
        errors.push(`Item has not a description: ${el}`);
      }
    });
  });

  return errors.length === 0 ? true : errors;
}
