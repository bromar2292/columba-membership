import React from "react";
import "../scss/_.scss";
import app from "../firebase/base";
import db from "../firebase/database";

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
  render() {
    console.log(this.state.users.pitching);
    const data = [
      {
        title: "Pitching",
        paragraph: this.state.users.pitching
      },
      {
        title: "Growth",
        paragraph: this.state.users.growth
      },
      {
        title: "Experiance",
        paragraph: this.state.users.experiance
      },
      {
        title: "Innovation",
        paragraph: this.state.users.innovation
      },
      {
        title: "Retention",
        paragraph: this.state.users.retention
      },
      {
        title: "Cost",
        paragraph: this.state.users.cost
      }
    ];
    return (
      <div className="accordion-container">
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
      props: { paragraph, title },
      state: { opened }
    } = this;

    return (
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
          <span {...{ className: "accordion-item__icon" }} />
        </div>
        <div {...{ className: "accordion-item__inner" }}>
          <div {...{ className: "accordion-item__content" }}>
            <p {...{ className: "accordion-item__paragraph" }}>{paragraph}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default Accordion;
