import React from "react";
import Edit from "./Edit";
import { CardTitle, Card, CardText } from "react-mdl";
import "./style/Home.css";
import welcomecard from "./img/welcome_card.jpg";

class Home extends React.Component {
  render() {
    const {
      things,
      title,
      content,
      require,
      toTasklist,
      onAdd,
      onTitleChange,
      onContentChange
    } = this.props;
    return (
      <div className="welcome">
        <Card shadow={0} style={{ margin: "auto" }}>
          <CardTitle
            style={{
              color: "#fff",
              height: "176px",
              background: `url(${welcomecard}) left / cover`
            }}
          >
            New task
          </CardTitle>
          <CardText>Please add a new task to review.</CardText>
          <Edit
            things={things}
            title={title}
            require={require}
            content={content}
            toTasklist={toTasklist}
            onAdd={onAdd}
            onTitleChange={onTitleChange}
            onContentChange={onContentChange}
          />
        </Card>
      </div>
    );
  }
}

export default Home;
