import React from 'react';
import {Box} from '@material-ui/core';
import SectionInfos from './dialogSections/enums';

const CardDialogContentBody = ({
  lockedSections,
  toggleLock,
  sections,
  sectionValues,
  deleteSection,
  dispatchUpdate,
}) => {
  // TODO: Ensure state changes don't re-render every section
  return (
    <Box
      display="flex"
      alignItems="stretch"
      flexGrow={1}
      flexDirection="column"
      justifyContent="space-evenly"
      paddingBottom={3}
    >
      {
        /* NOTE: We map the enum so the section order is preserved. 
                   (state `sections` doesn't maintain order.)
          */
        Object.keys(SectionInfos).map((sectionCode) => {
          const {title, IconComponent, SectionComponent} = SectionInfos[
            sectionCode
          ];

          const render = sections.includes(sectionCode);
          const locked = lockedSections.includes(sectionCode);
          const result = render && (
            <SectionComponent
              key={sectionCode}
              code={sectionCode}
              title={title}
              IconComponent={IconComponent}
              handleDelete={deleteSection}
              value={sectionValues[sectionCode]}
              propName={SectionInfos[sectionCode].dbPropName}
              dispatchUpdate={dispatchUpdate}
              locked={locked}
              toggleLock={toggleLock}
              optional={SectionInfos[sectionCode].optional}
            />
          );
          return result;
        })
      }
    </Box>
  );
};

export default CardDialogContentBody;
