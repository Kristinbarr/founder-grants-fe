import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { deleteSuggestion } from "../../actions";
import axios from "axios";

// Styling
import { suggestionStyles } from "../../styles/suggestionStyles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowRightOutlinedIcon from '@material-ui/icons/KeyboardArrowRightOutlined';

const Suggestions = props => {
  // Force Update for our onClick action
  // const forceUpdate = useForceUpdate();

  // console.log('grantSuggestionList props: ', props)
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const grant_id = props.rowData.id;
    axios
      .get(
        `https://grantly-staging.herokuapp.com/api/admin/suggestions/${grant_id}`,
        {
          headers: {
            auth0id: props.currentUser.auth_id,
            authorization: `Bearer ${props.currentUser.token}`
          }
        }
      )
      .then(res => {
        setSuggestions(res.data);
        console.log("AXIOS WORKED", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.rowData]);

  const onClickDelete = (suggestion_id, currentUser) => {
    props.deleteSuggestion(suggestion_id, currentUser);
    const updatedSuggs = suggestions.filter(sugg => sugg.id !== suggestion_id);
    setSuggestions(updatedSuggs);
  };

  const classes = suggestionStyles();

  return (
    <>

      {suggestions.length ? 
      <Button 
          variant="outlined"
          onClick={handleClickOpen}
          className={suggestions.length ? classes.iconBtnWithSuggestions : classes.iconBtnWithOutSuggestions}
          >
          {suggestions.length}
          <ArrowDropDownIcon />
        </Button> :
        <Button
          className={classes.iconBtnWithOutSuggestions}
        >
          {suggestions.length}
        </Button>
      }

      <Dialog 
        open={open} 
        onClose={handleClose} 
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">User Suggestions</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {suggestions.length ? (
          <ul className={classes.suggestionUl}>

          {suggestions.map(suggestion => (
            <ListItem alignItems="flex-start" className={classes.suggestionLi}>
              <IconButton
                onClick={() => onClickDelete(suggestion.id, props.currentUser)}
              >
                <DeleteIcon />
              </IconButton>
              <ListItemText
                primary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body3"
                      color="textPrimary"
                    >
                      <span className={classes.suggestionLabel}>Subject: </span>
                      {suggestion.subject}
                    </Typography>
                  </React.Fragment>
                  }
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body3"
                      color="textPrimary"
                    >
                      {`Suggestion: ${suggestion.suggestion}`}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
          {/* {suggestions.map(suggestion => (
            <li
              alignItems="center"
              className={classes.suggestionLi}
              key={suggestion.id}
            >
              <Button
                className={classes.delSuggestBtn}
                onClick={() => onClickDelete(suggestion.id, props.currentUser)}
              >
                <DeleteOutlineRoundedIcon />
              </Button>
              <div className='p_wrapper'>
              <p className={classes.suggestionHeader}> {suggestion.subject}</p>
              <p className={classes.suggestionParagraph}>
                {suggestion.suggestion}
              </p>
              </div>
            </li>
          ))} */}

        </ul>
      ) : (
        <h1 className={classes.suggestionNone}>
          {" "}
          There are no user suggestions at this time
        </h1>
      )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      
    </>
  );
};
const mapStateToProps = state => {
  // console.log("GrantList mapStateToProps state", state);
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps, { deleteSuggestion })(Suggestions);
