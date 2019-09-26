import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GrantList from "../components/grants/GrantList";
import Filters from "../components/Filters";
import GrantShowcase from "../components/grants/GrantShowcase";
import MobileTabs from "../components/MobileTabs";
import SearchBar from "../components/SearchBar";
import Grid from "@material-ui/core/Grid";
import Navbar from "../components/Navbar";
import Media from "react-media";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MobileFilters from "../components/MobileFilters";

const useStyles = makeStyles(theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  gridContainer: {
    margin: "0",
    flexWrap: "nowrap"
  },
  gridItem: {
    padding: 30
  },
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar
}));

const Home = props => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = open => event => {
    console.log("toggle")
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(!isOpen);
  };
  const classes = useStyles();

  return (
    <>
      <Navbar location={props.location.pathname} />
      {/* <SearchBar /> */}
      <Media query="(max-width:850px)">
        {matches =>
          matches ? (
            <>
              <MobileTabs /> 
              <MobileFilters />
              <SwipeableDrawer
                anchor="bottom"
                open={isOpen}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
              >
                <Filters location={props.location.pathname} />
              </SwipeableDrawer>
            </>
          ) : (
            <div>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-start"
                className={classes.gridContainer}
              >
                <Grid
                  item
                  md={3}
                  xs={12}
                  className={classes.gridItem}
                  style={{ padding: "30px 0 0 30px" }}
                >
                  {/* <div className={classes.scrollBox}> */}
                  <GrantList />
                  {/* </div> */}
                </Grid>
                <Grid
                  item
                  xs={6}
                  className={classes.gridItem}
                  style={{ padding: "30px 30px 0 30px" }}
                >
                  <GrantShowcase />
                </Grid>
                <Grid item xs={2}>
                  <Filters location={props.location.pathname} />
                </Grid>
              </Grid>
            </div>
          )
        }
      </Media>
    </>
  );
};

export default Home;
