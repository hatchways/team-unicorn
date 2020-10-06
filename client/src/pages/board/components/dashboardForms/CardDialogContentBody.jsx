import React from 'react';
import {Box, DialogContent, makeStyles} from '@material-ui/core';
import CardDialogButtonMenu from './dialogSections/CardDialogButtonMenu';
import SectionInfos from './dialogSections/enums';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
});

const CardDialogContentBody = ({
  sections,
  sectionValues,
  addSection,
  deleteSection,
  dispatchUpdate,
}) => {
  const classes = useStyles();

  // TODO: Ensure state changes don't re-render every section
  return (
    <DialogContent className={classes.root}>
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
                optional={SectionInfos[sectionCode].optional}
              />
            );
            return result;
          })
        }
      </Box>
      <Box
        width="130px"
        minWidth="130px"
        maxWidth="130px"
        alignSelf="stretch"
        position="sticky"
        top={0}
        marginLeft={3}
      >
        <CardDialogButtonMenu handleAdd={addSection} />
      </Box>
    </DialogContent>
  );
};

export default CardDialogContentBody;
