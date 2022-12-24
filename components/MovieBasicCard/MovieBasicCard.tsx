import React from 'react';
import { makeStyles } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { QuestionMark } from '@mui/icons-material';

interface IMovieBasicCardProps{
  image?:string;
  title?:string;
}

const MovieBasicCard: React.FC<IMovieBasicCardProps> = ({ image, title }) => {

  return (
    <Card style={{maxWidth:345, height:625}}>
      <CardActionArea>
        <CardMedia
          style={{maxWidth:345, aspectRatio:3/5}}
          component="img"
          height="500"
          width="300"
          image={image == null ? "" : "https://image.tmdb.org/t/p/w300" + image }
          title={title}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" style={{textAlign:'center'}}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieBasicCard;
