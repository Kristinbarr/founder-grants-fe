import React from "react";
import { connect } from "react-redux";
import { dialogStyles } from "../styles/DialogStyles";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";
import { submitSuggestion } from "../../../actions/index";

const SuggestionDialog = props => {
  const [suggestion, setSuggestion] = React.useState("");
  console.log("SuggestionDialog suggestion", suggestion);

  const [open, setOpen] = React.useState(false);

  const classes = dialogStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChanges = name => ({ target: { value } }) => {
    setSuggestion(value);
  };

  const submitSuggestion = suggestion => {
    props.submitSuggestion(suggestion);
  };

  const handleSubmit = () => {
    console.log("SuggestionDialog handleSubmit firing");
    // submitSuggestion();
  };

  return (
    <>
      <Button
        className={classes.applyButton}
        variant="contained"
        color="primary"
        onClick={handleOpen}
      >
        Suggest Changes
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Suggest changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please suggest changes in the below dialog
          </DialogContentText>
          <form>
            <TextField
              multiline
              rows="4"
              value={suggestion}
              onChange={handleChanges("suggestion")}
              margin="normal"
              className={classes.formField}
            />
            <br />
          </form>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="outlined" onClick={handleSubmit}>
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default connect(
  null,
  { submitSuggestion }
)(SuggestionDialog);
