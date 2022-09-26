import { hasText } from 'utils';
import { parseSliceName } from 'client/prismic';

const useCta = (data) => {
  if (!data) return null;

  const {
    cta_label,
    cta_copy,
    cta_text,
    cta_button_label,
    button_label,
    cta_link,
    cta_url,
    cta_button_link,
    button_link,
    cta_style,
    text_align,
    align_text,
    align_text_mobile,
    target_slice,
  } = data || null;

  const alignmentDesktop = text_align || align_text;
  const alignmentMobile = align_text_mobile || alignmentDesktop;

  // If the slice has text-alignment then align the button to match
  const calculateMargin = (alignment, side) => {
    if (alignment === 'center') {
      return 'auto';
    }
    if (alignment === 'left') {
      return '0';
    }
    if (alignment === 'right' && side === 'left') {
      return 'auto';
    }
    if (alignment === 'right' && side === 'right') {
      return '0';
    }
  };

  // CTA keynames vary in Prismic so this is flexible to account for every possible case
  const cta = {
    label: cta_label || cta_button_label || cta_text || cta_copy || button_label,
    doc: cta_link || cta_button_link || cta_url || button_link,
    style: cta_style,
  };

  // Add the margin properties if text-alignment is set
  if (alignmentMobile && alignmentDesktop) {
    cta.mr = [calculateMargin(alignmentMobile, 'right'), calculateMargin(alignmentDesktop, 'right')];
    cta.ml = [calculateMargin(alignmentMobile, 'left'), calculateMargin(alignmentDesktop, 'left')];
  }

  if (target_slice) {
    cta.anchor = `#${parseSliceName(target_slice)}`;
  }

  // Return null if there is no CTA
  if (!cta.label || cta.doc.link_type === 'Any' || !hasText(cta.label)) {
    return null;
  }

  return cta;
};

export default useCta;
