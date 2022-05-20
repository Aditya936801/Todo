import {Card,CardHeader,CardContent, IconButton, Typography, Avatar, makeStyles} from "@material-ui/core"
import { blue, green, pink, yellow } from "@material-ui/core/colors"
import {DeleteOutlined} from "@material-ui/icons"


const useStyles = makeStyles({
    avatar:{
        backgroundColor:(note)=>{
            if(note.category === "Work")
            {
                return yellow[700]
            }
            if(note.category === "Money")
            {
                return green[500]
            }
            if(note.category === "Todo's")
            {
                return pink[500]
            }
            return blue[500]
        }  ,
    content:{
        display:"flex"
    }    
    }

})

const NoteCard = ({note,handleDelete}) => {

    const classes = useStyles(note)

    return (  
        <Card >
            <CardHeader
             avatar={
                <Avatar className={classes.avatar} >{note.category[0]}</Avatar>
             }
             action={
                 <IconButton onClick={()=>{handleDelete(note.id)}}>
                    <DeleteOutlined />
                 </IconButton>
             }
             title={note.title}
             subheader={note.category} />
            <CardContent  >
            <Typography variant="body2" color="textSecondary"  >
            {note.details}
            </Typography>
            </CardContent> 
        </Card>

    );
}
 
export default NoteCard;