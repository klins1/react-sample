import React from 'react';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as usersAction from '../../../shared/store/reducers/users';
import * as d3 from 'd3/dist/d3';

// d3.csv('gates_money.csv', (err, data) => {
//
// });

const BubbleChart = ({ width, height, children }) => {
  return (
    <svg className="bubbleChart" width={width} height={height}>
      {
        children
      }
    </svg>
  )
};

function Bubbles({ data }) {
  const bubbles = data.map( ({id,x,y,r}) => <Bubble key={id} x={x} y={y} r={r} />);
  return (
    <g className="bubbles">
      {
        bubbles
      }
    </g>
  )
}

function Bubble({ x,y,r }) {
  return (
    <circle cx={x} cy={y} r={r} />
  )
}

class HomeApp extends React.Component {

  componentDidMount() {
    d3.select('#circle')
      .style('background', 'red')
      .attr('cx', 100);

    const data = [12, 5, 6, 6, 9, 10];

    const w = 400;
    const h = 500;

    const svg = d3.select(this.divRef)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("margin-left", 100);

    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => h - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green")
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <div>
        <h1>Home > D3</h1>
        <div id="circle" className="circle">circle</div>
        <div ref={ref => this.divRef = ref} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users
});

const mapDispatchToProps = (dispatch) => ({
  UsersRxjsActions: bindActionCreators(usersAction, dispatch)
});


// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardApp));
// export default DashboardApp;

export default connect(mapStateToProps, mapDispatchToProps)(HomeApp);