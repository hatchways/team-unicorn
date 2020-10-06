import DescIcon from '@material-ui/icons/ImportContactsTwoTone';
import DeadlineIcon from '@material-ui/icons/ScheduleOutlined';
import CommentsIcon from '@material-ui/icons/ForumOutlined';
import AttachmentIcon from '@material-ui/icons/AttachFileOutlined';
import ChecklistIcon from '@material-ui/icons/PlaylistAddCheckRounded';
import TagsIcon from '@material-ui/icons/LabelRounded';
import {colors} from '@material-ui/core';
import CardDialogDesc from './CardDialogDesc';
import CardDialogChecklist from './CardDialogChecklist';
import CardDialogDeadline from './CardDialogDeadline';
import CardDialogComments from './CardDialogComments';
import CardDialogAttachments from './CardDialogAttachments';
import CardDialogTags from './CardDialogTags';

const SectionInfos = {
  DESC: {
    title: 'Description',
    IconComponent: DescIcon,
    SectionComponent: CardDialogDesc,
    optional: false,
  },
  CHCK: {
    title: 'Checklist',
    IconComponent: ChecklistIcon,
    SectionComponent: CardDialogChecklist,
    optional: true,
  },
  DEDL: {
    title: 'Deadline',
    IconComponent: DeadlineIcon,
    SectionComponent: CardDialogDeadline,
    optional: true,
  },
  COMM: {
    title: 'Comments',
    IconComponent: CommentsIcon,
    SectionComponent: CardDialogComments,
    optional: true,
  },
  ATCH: {
    title: 'Attachments',
    IconComponent: AttachmentIcon,
    SectionComponent: CardDialogAttachments,
    optional: true,
  },
  TAGS: {
    title: 'Tags',
    IconCompnent: TagsIcon,
    SectionComponent: CardDialogTags,
    optional: true,
  },
  // COVR: {title: 'Cover', IconComponent: CoverIcon},
};

const CardColorsFactory = (shade) => ({
  GREEN: colors.green[shade],
  AMBER: colors.amber[shade],
  RED: colors.red[shade],
  INDIGO: colors.indigo[shade],
  BLUE: colors.blue[shade],
});

export default SectionInfos;
export {CardColorsFactory};
