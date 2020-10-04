import DescIcon from '@material-ui/icons/ImportContactsTwoTone';
import DeadlineIcon from '@material-ui/icons/ScheduleOutlined';
import CommentsIcon from '@material-ui/icons/ForumOutlined';
import AttachmentIcon from '@material-ui/icons/AttachFileOutlined';
import ChecklistIcon from '@material-ui/icons/PlaylistAddCheckRounded';
import TagsIcon from '@material-ui/icons/LabelRounded';
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
  },
  CHCK: {
    title: 'Checklist',
    IconComponent: ChecklistIcon,
    SectionComponent: CardDialogChecklist,
  },
  DEDL: {
    title: 'Deadline',
    IconComponent: DeadlineIcon,
    SectionComponent: CardDialogDeadline,
  },
  COMM: {
    title: 'Comments',
    IconComponent: CommentsIcon,
    SectionComponent: CardDialogComments,
  },
  ATCH: {
    title: 'Attachments',
    IconComponent: AttachmentIcon,
    SectionComponent: CardDialogAttachments,
  },
  TAGS: {
    title: 'Tags',
    IconCompnent: TagsIcon,
    SectionComponent: CardDialogTags,
  },
  // COVR: {title: 'Cover', IconComponent: CoverIcon},
};

export default SectionInfos;
