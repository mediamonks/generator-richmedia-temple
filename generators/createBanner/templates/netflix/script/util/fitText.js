export default function fitText(copyElement) {
  for (let i = 0; i < copyElement.length; i++) {
    TweenMax.set(copyElement[i], { clearProps: 'fontSize, lineHeight' });
    var p = copyElement[i].parentElement;
    var s = Number(
      window
        .getComputedStyle(p, null)
        .getPropertyValue('font-size')
        .replace('px', ''),
    );
    var l =
      Number(
        window
          .getComputedStyle(p, null)
          .getPropertyValue('line-height')
          .replace('px', ''),
      ) || s + 1;
    var targetWidth = Number(
      window
        .getComputedStyle(copyElement[i], null)
        .getPropertyValue('width')
        .replace('px', ''),
    );
    var parentWidth = Number(
      window
        .getComputedStyle(p, null)
        .getPropertyValue('width')
        .replace('px', ''),
    );
    var targetHeight = Number(
      window
        .getComputedStyle(copyElement[i], null)
        .getPropertyValue('height')
        .replace('px', ''),
    );
    var parentHeight = Number(
      window
        .getComputedStyle(p, null)
        .getPropertyValue('height')
        .replace('px', ''),
    );
    if (targetHeight > parentHeight || targetWidth > parentWidth) {
      while (
        Number(
          window
            .getComputedStyle(copyElement[i], null)
            .getPropertyValue('height')
            .replace('px', ''),
        ) > parentHeight ||
        Number(
          window
            .getComputedStyle(copyElement[i], null)
            .getPropertyValue('width')
            .replace('px', ''),
        ) > parentWidth
      ) {
        s -= 0.2;
        l -= 0.2;
        copyElement[i].style.fontSize = s + 'px';
        copyElement[i].style.lineHeight = l + 'px';
      }
    }
  }
}
