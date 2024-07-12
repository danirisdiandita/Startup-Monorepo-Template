import React from "react";
import PropTypes from "prop-types";

const valueType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool
]);

const propTypes = {
  labels: PropTypes.shape({
    left: {
      title: PropTypes.string.isRequired,
      value: valueType
    },
    center: {
      title: PropTypes.string.isRequired,
      value: valueType
    },
    right: {
      title: PropTypes.string.isRequired,
      value: valueType
    }
  }),
  onChange: PropTypes.func.isRequired,
  styles: PropTypes.object
};

const defaultProps = {
  labels: {
    left: {
      title: "left",
      value: "left"
    },
    center: {
      title: "center",
      value: "center"
    },
    right: {
      title: "right",
      value: "right"
    }
  },
  onChange: (value) => console.log("value:", value)
};

class TripleToggleSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switchPosition: "left",
      animation: null
    };
  }

  getSwitchAnimation = (value) => {
    const { switchPosition } = this.state;
    let animation = null;
    if (value === "center" && switchPosition === "left") {
      animation = "left-to-center";
    } else if (value === "right" && switchPosition === "center") {
      animation = "center-to-right";
    } else if (value === "center" && switchPosition === "right") {
      animation = "right-to-center";
    } else if (value === "left" && switchPosition === "center") {
      animation = "center-to-left";
    } else if (value === "right" && switchPosition === "left") {
      animation = "left-to-right";
    } else if (value === "left" && switchPosition === "right") {
      animation = "right-to-left";
    }
    this.props.onChange(value);
    this.setState({ switchPosition: value, animation });
  };

  render() {
    const { labels } = this.props;

    return (
      <div className="flex items-center justify-center gap-4 p-4">
        <div
          className={`relative w-20 h-8 bg-gray-300 rounded-full ${
            this.state.switchPosition === "left" ? "left-0" : this.state.switchPosition === "center" ? "left-1/2 transform -translate-x-1/2" : "right-0"
          } transition-all duration-300`}
        >
          <div
            className={`absolute top-0 left-0 w-8 h-8 bg-white rounded-full shadow-md transform transition-all duration-300 ${
              this.state.animation === "left-to-center" ? "translate-x-1/2" : this.state.animation === "center-to-right" ? "translate-x-full" : this.state.animation === "right-to-center" ? "-translate-x-1/2" : this.state.animation === "center-to-left" ? "-translate-x-full" : this.state.animation === "left-to-right" ? "translate-x-full" : this.state.animation === "right-to-left" ? "-translate-x-full" : ""
            }`}
          ></div>
        </div>
        <div className="flex items-center gap-2">
          <input
            defaultChecked
            onChange={(e) => this.getSwitchAnimation(e.target.value)}
            name="map-switch"
            id="left"
            type="radio"
            value="left"
            className="hidden"
          />
          <label
            className={`cursor-pointer ${
              this.state.switchPosition === "left" ? "text-black" : "text-gray-500"
            }`}
            htmlFor="left"
          >
            <h4>{labels.left.title}</h4>
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            onChange={(e) => this.getSwitchAnimation(e.target.value)}
            name="map-switch"
            id="center"
            type="radio"
            value="center"
            className="hidden"
          />
          <label
            className={`cursor-pointer ${
              this.state.switchPosition === "center" ? "text-black" : "text-gray-500"
            }`}
            htmlFor="center"
          >
            <h4>{labels.center.title}</h4>
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            onChange={(e) => this.getSwitchAnimation(e.target.value)}
            name="map-switch"
            id="right"
            type="radio"
            value="right"
            className="hidden"
          />
          <label
            className={`cursor-pointer ${
              this.state.switchPosition === "right" ? "text-black" : "text-gray-500"
            }`}
            htmlFor="right"
          >
            <h4>{labels.right.title}</h4>
          </label>
        </div>
      </div>
    );
  }
}

TripleToggleSwitch.propTypes = propTypes;
TripleToggleSwitch.defaultProps = defaultProps;

export default TripleToggleSwitch;
