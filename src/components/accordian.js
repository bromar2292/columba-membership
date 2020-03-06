import React from "react";
import "../scss/_.scss";
import app from "../firebase/base";
import db from "../firebase/database";
import red from "../components/static/Red.png";
import yellow from "../components/static/Yellow.png";
import green from "../components/static/Green.png";
class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "Columba",
      users: []
    };
  }

  componentWillMount() {
    let userId = `${app.auth().currentUser.uid}`;
    // console.log(userId);
    let User = db.collection("users").doc(userId);
    User.get()
      .then(doc => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          let users = doc.data();
          this.setState({ users: users });
          // console.log("Document data:", doc.data());
        }
      })
      .catch(err => {
        console.log("Error getting document", err);
      });
  }
  Class = e => {
    if (e === 1) {
      return red;
    } else if (e === 2) {
      return yellow;
    } else if (e === 3) {
      return green;
    }
  };
  render() {
    console.log(this.state.users.pitching);
    const data = [
      {
        title: "Pitching",
        paragraph: this.state.users.pitching,
        color: this.Class(this.state.users.piePitching)
      },
      {
        title: "Growth",
        paragraph: this.state.users.growth,
        color: this.Class(this.state.users.pieGrowth)
      },
      {
        title: "Experiance",
        paragraph: this.state.users.experiance,
        color: this.Class(this.state.users.pieExperience)
      },
      {
        title: "Delivery",
        paragraph: this.state.users.delivery,
        color: this.Class(this.state.users.pieDelivery)
      },
      {
        title: "Retention",
        paragraph: this.state.users.retention,
        color: this.Class(this.state.users.pieRetention)
      },
      {
        title: "Cost",
        paragraph: this.state.users.cost,
        color: this.Class(this.state.users.piePitching)
      },
      {
        title: "innovation",
        paragraph: this.state.users.innovation,
        color: green
      }
    ];
    return (
      <div className={this.props.accordionContainer}>
        <h2>Columba Observations</h2>
        <div {...{ className: "wrapper" }}>
          <ul {...{ className: "accordion-list" }}>
            {data.map((data, key) => {
              return (
                <li {...{ className: "accordion-list__item", key }}>
                  <AccordionItem {...data} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

class AccordionItem extends React.Component {
  state = {
    opened: false
  };

  render() {
    const {
      props: { paragraph, title, color },
      state: { opened }
    } = this;

    return (
      <>
        <div
          {...{
            className: `accordion-item, ${opened && "accordion-item--opened"}`,
            onClick: () => {
              this.setState({ opened: !opened });
            }
          }}
        >
          <div {...{ className: "accordion-item__line" }}>
            <h3 {...{ className: "accordion-item__title" }}>{title}</h3>
            <img src={color} {...{ className: "accordion-item__icon" }} />
          </div>
          <div {...{ className: "accordion-item__inner" }}>
            <div {...{ className: "accordion-item__content" }}>
              <p {...{ className: "accordion-item__paragraph" }}>{paragraph}</p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Accordion;
