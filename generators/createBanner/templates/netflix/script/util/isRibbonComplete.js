export default function isRibbonComplete(ribbon) {
  return new Promise(resolve => {
    const complete = () => {
      ribbon.removeEventListener('leftPillarComplete', complete);
      resolve();
    };
    ribbon.addEventListener('leftPillarComplete', complete);
  });
}
