import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab'

const StyledTab = styled((props) => <Tab {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: theme.typography.pxToRem(15),
        marginRight: theme.spacing(1),
    }),
);

export default StyledTab;