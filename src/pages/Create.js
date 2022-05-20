import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import { Radio } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import {useNavigate} from "react-router-dom"

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
  },
});

const Create = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState("Todo's");
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === "") {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
    if (details === "") {
      setDetailsError(true);
    } else {
      setDetailsError(false);
    }

    if (title && details) {
      fetch("http://localhost:8000/notes",{
        method: "POST",
        headers: {"Content-type":"application/json"},
        body: JSON.stringify({title,details,category})
      })
      .then(()=>{
        navigate('/')

      }
      )
    }
  };

  return (
    <Container>
      <Typography
        variant="h2"
        color="textSecondary"
        gutterBottom
      >
        Create a new Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          className={classes.field}
          label="Note Title"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          error={titleError}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          className={classes.field}
          label="Details"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          multiline
          rows={4}
          error={detailsError}
          onChange={(e) => {
            setDetails(e.target.value);
          }}
        />

        <FormControl className={classes.field} >
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <FormControlLabel value="Money" control={<Radio />} label="Money" />
            <FormControlLabel
              value="Todo's"
              control={<Radio />}
              label="Todo's"
            />
            <FormControlLabel
              value="Remainders"
              control={<Radio />}
              label="Remainders"
            />
            <FormControlLabel value="Work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}
          className="btn"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default Create;
