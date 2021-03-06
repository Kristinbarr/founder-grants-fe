import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useTheme } from "@material-ui/core/styles";
import { mobileTabStyles } from "../../styles/mobileTabStyles";

import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";

import GrantList from "../grants/GrantList";
import GrantShowcase from "../grants/GrantShowcase";
import { changeTab } from "../../actions/index";
import SubmitForm from "../SubmitForm";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}
function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const MobileTabs = ({ grant, currentTab, changeTab, inAdmin, history }) => {
  const classes = mobileTabStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  useEffect(() => {
    handleChangeIndex(currentTab);
  }, [currentTab]);
  function handleChange(event, newValue) {
    setValue(newValue);
    changeTab(newValue);
  }

  function handleChangeIndex(index) {
    setValue(index);
    changeTab(index);
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab className={classes.tab} label="Grants" {...a11yProps(0)} />
          <Tab className={classes.tab} label="Showcase" {...a11yProps(1)} />
          <Tab className={classes.tab} label="Submit" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <GrantList inAdmin={inAdmin} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <GrantShowcase inAdmin={inAdmin} />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <SubmitForm history={history}/>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    grant: state.grantShowcase,
    currentTab: state.currentTab
  };
};
export default connect(
  mapStateToProps,
  { changeTab }
)(MobileTabs);
