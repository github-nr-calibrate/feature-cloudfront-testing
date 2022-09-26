import React from 'react';
import { Button } from 'components/Button';
import styled from 'styled-components';
import { Box } from 'components/Layout';

function SectionSaver() {
  const sectionHeroes = this.state.data.body
    .filter(({ slice_type }) => slice_type === 'section_hero');

  const togglePrintability = (e) => {
    this.state.data.body.forEach((slice) => {
      if (slice._section === Number(e.target.value)) {
        slice._printable = e.target.checked;
      }
    });
    this.setState(this.state);
  };

  const printPage = () => {
    try {
      document.execCommand('print', false, null);
    } catch (e) {
      window.print();
    }
  };

  const SelectSectionPrinter = () => (
    <div>
      <h3>FIND WHAT WORKS</h3>
      <Box as="p" marginBottom="20px">What do you want to try from this lesson?</Box>

      {sectionHeroes.map((sectionHero, index) => (
        <div key={sectionHero.primary.title[0].text}>
          <label>
            <input
              type="checkbox"
              value={index}
              onChange={togglePrintability}
              checked={sectionHero._printable}
            />
            {sectionHero.primary.title[0].text}
          </label>
        </div>
      ))}

      <PrintButton variant="primary" onClick={printPage}>
        PRINT
      </PrintButton>
    </div>
  );

  const AllSectionsPrinter = () => (
    <PrintButton aria-label="print" onClick={printPage}>
      <img
        alt="All Sections Printer"
        style={{ width: '100%', height: '100%' }}
        src="https://images.prismic.io/calibrate/52c631c6-7f32-4211-a733-d04597b7574d_print.svg?auto=compress,format"
      />
    </PrintButton>
  );

  if (sectionHeroes && sectionHeroes.length) {
    return (
      <Box margin="40px 0" className="no-print">
        <SelectSectionPrinter />
      </Box>
    );
  }

  return (
    <Box margin="40px 0" className="no-print">
      <AllSectionsPrinter />
    </Box>
  );
}

const PrintButton = styled(Button)`
  display: block;
  width: 75px;
  height: 75px;
  background: var(--color__lavender);
  padding: 15px;
  border-radius: 150px;
  margin: 0 auto;
`;

export default SectionSaver;
