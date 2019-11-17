import React from "react";
import "../../firebase";
import Grid from "@material-ui/core/Grid";
import UserCol from "../../components/UserCol/UserCol";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "./user.css";
import NewCardComponent from "../../components/NewCardComponent";
import NewSectionComponent from "../../components/NewSectionComponent";
import NewClientComponent from "../../components/NewClientComponent";
import Button from '@material-ui/core/Button';
import Link from 'react-router-dom/Link';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showingSections: false,
      showingCards: false,
      userid: "user7",
      clientid: null,
      sectionid: null,
      currentNewComponent : {
          type:null,
          count:null
      },
    };
    this.show = this.show.bind(this);
    this.onSelected = this.onSelected.bind(this);
    this.showNewComponent = this.showNewComponent.bind(this)
  }

  onSelected(type, id) {
    this.setState({ ...this.state, [type]: id });
  }

    showNewComponent(type, count) {
        this.setState({ ...this.state, currentNewComponent: {type,count} })
    }
    /**
     * Reveal the column.
     */
    show(type) {
        if (type === "sections") {
            this.setState({ showingSections: true });
        } else if (type === "cards") {
            this.setState({ showingCards: true });
        }
    }
    render() {
        const { showingSections, showingCards, clientid, userid, sectionid, currentNewComponent } = this.state;
        return (
            <>
                <AppBar position="static" className="navMenu">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">User</Typography>
                        <section className="rightNav">
                            <Button component={Link} color="inherit" to={(userid === null) ? `/client/${clientid}` : '/error'}>Preview</Button>
                        </section>
                    </Toolbar>
                </AppBar>
                <Grid container className="Main">
                    <Grid item className="Column">
                        <h1>Clients</h1>
                        <UserCol
                            title="Clients"
                            id="clientid"
                            onSelected={this.onSelected}
                            type="sections"
                            show={this.show}
                            showNewComponent={this.showNewComponent}
                            path={"/users/" + userid + "/clients"}
                        />
                    </Grid>
                    {showingSections && (
                        <Grid item className="Column">
                            <h1>Sections</h1>
                            <UserCol
                                title="Sections"
                                id="sectionid"
                                onSelected={this.onSelected}
                                type="cards"
                                showNewComponent={this.showNewComponent}
                                show={this.show}
                                path={
                                    "/users/" +
                                    userid +
                                    "/clients/" +
                                    clientid +
                                    "/sections"
                                }
                            />
                        </Grid>
                    )}
                    {showingCards && (
                        <Grid item className="Column">
                            <h1>Cards</h1>
                            <UserCol
                                title="Cards"
                                id="cardsid"
                                onSelected={this.onSelected}
                                showNewComponent={this.showNewComponent}
                                path={
                                    "/users/" +
                                    userid +
                                    "/clients/" +
                                    clientid +
                                    "/sections/" +
                                    sectionid +
                                    "/cards"
                                }
                            />
                        </Grid>
                    )}
                </Grid>
                {currentNewComponent["type"] === "cardsid" && (
                    <NewCardComponent
                        path={
                            "/users/" +
                            userid +
                            "/clients/" +
                            clientid +
                            "/sections/" +
                            sectionid +
                            "/cards"
                        }
                        count = {currentNewComponent["count"] }

                    />
                )
                }

                {currentNewComponent["type"]  === "sectionid" && (
                    <NewSectionComponent
                        path={
                            "/users/" +
                            userid +
                            "/clients/" +
                            clientid +
                            "/sections"
                        }
                        count = {currentNewComponent["count"] }

                    />
                )
                }

                {currentNewComponent["type"]  === "clientid" && (
                    <NewClientComponent
                        path={
                            "/users/" +
                            userid +
                            "/clients/"
                        }

                        count = {currentNewComponent["count"] }
                    />
                )}
            </>
        );
    }
}
