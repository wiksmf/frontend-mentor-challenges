'use strict';

const faqManagement = () => {
  const faqDetails = document.querySelectorAll('.faq-details');

  faqDetails.forEach(faq => {
    faq.addEventListener('click', () => {
      faqDetails.forEach(detail => {
        if (detail !== faq) detail.removeAttribute("open");
      });
    })
  });
}

faqManagement();