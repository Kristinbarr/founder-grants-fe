import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchApi, adminFetchApi, postGrants, putGrants, deleteGrants, deleteSuggestion } from "../../actions";
import { useAuth0 } from "../../react-auth0-wrapper";
import moment from 'moment';

// Styling
import MaterialTable from "material-table";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Typography from "@material-ui/core/Typography";
import { grantTableStyles, suggestionStyles } from '../../styles/grantTableStyles';

// Components
import GrantSuggestionList from './GrantSuggestionList'

export const GrantTable = (props) => {
  console.log('GrantTable props',props)
  // console.log('GrantTable current user',props.currentUser)
  // console.log('adminprops', props.inAdmin);

  // reformat deadline and last updated dates
  props.data.forEach(grant => {
    grant.most_recent_application_due_date =
      moment(grant.most_recent_application_due_date).format(
        "MMM DD, YYYY"
      ) === "Invalid date"
        ? undefined
        : moment(grant.most_recent_application_due_date).format(
            "MMM DD, YYYY"
      )
    grant.details_last_updated =
      moment(grant.details_last_updated).format(
        "L LT"
      ) === "Invalid date"
        ? undefined
        : moment(grant.details_last_updated).format(
            "L LT"
      )
  })

  const [state, setState] = useState({
    // This array is currently needed in order for state to save onRowUpdate
    data: []
  });

  // const [stateRowData, setStateRowData] = useState([]);

  // const [hasCurrentUser, setHasCurrentUser] = useState({});

  // useEffect(() => {
  //   if (props.inAdmin) {
  //     console.log("what?", props.inAdmin);
  //     console.log("yes");
  //     props.adminFetchApi(props.currentUser);
  //   } else if (props.data.length === 0) {
  //     console.log('elseif');
  //     props.fetchApi();
  //   } else  {
  //     // props.fetchApi();
  //   }
  // }, []);

  useEffect(() => {
      if (props.currentUser.id) {
        props.adminFetchApi(props.currentUser);
      }
  }, [props.currentUser]);

  // TODO: display a count of items needing to be reviewed
  // const needToBeReviewed = props.data.filter(
  //   grant => grant.is_reviewed === false
  // ).length;
// const onClickDelete = (suggestion_id, currentUser) => {
//   console.log(suggestion_id, currentUser)
//   props.deleteSuggestion(suggestion_id, currentUser);
// };

const editComponentFunc = props => {
  console.log("edit props", props);
  return (
    <textarea
      type="text"
      value={props.value}
      style={{ minWidth: "300px", padding: "0 1em", fontFamily: "EB Garamond" }}
      onChange={e => props.onChange(e.target.value)}
    />
  );
};

  return (
    <div>
      <MaterialTable
        title="Edit and Approve Grants"
        columns={[
          {
            title: "User Suggestions", field: "has_requests", type: "integer"
          },
          {
            title: "Grant Status",
            cellStyle: cellData => ({
              backgroundColor: cellData === "Pending" ? "#3DB8B3" : "none"
            }),
            field: "is_reviewed",
            lookup: {
              true: "Approved",
              false: "Pending"
            }
          },
          {
            title: "Last Updated",
            field: "details_last_updated",
            type: "date",
            editable: "never"
          }, //sent to server in action. not editable by user
          {
            title: "Name",
            field: "competition_name",
            cellStyle: {
              minWidth: "200px"
            }
          },
          { title: "Amount", field: "amount", type: "integer" },
          {
            title: "Amount Notes",
            field: "amount_notes",
            cellStyle: {
              minWidth: "300px"
            }
          },
          {
            title: "Deadline",
            field: "most_recent_application_due_date",
            type: "date"
          },
          {
            title: "Focus Area",
            field: "area_focus",
            lookup: {
              "Arts": "Arts",
              "Child Care": "Child Care",
              "Economic Opportunity": "Economic Opportunity",
              "Energy & Resources": "Energy & Resources",
              "Environment": "Environment",
              "Financial": "Financial",
              "Food": "Food",
              "Health": "Health",
              "Housing": "Housing",
              "Information Technology": "Information Technology",
              "Life Improvement": "Life Improvement",
              "Social Entrepreneurship": "Social Entrepreneurship",
              "Workforce Development": "Workforce Development"
            }
          },
          { title: "Sponsor", field: "sponsoring_entity" },
          {
            title: "Notes",
            field: "notes",
            cellStyle: {
              minWidth: "400px"
            },
            editComponent: editComponentFunc
          },
          { title: "Website", field: "website" },
          {
            title: "Geographic Region",
            field: "geographic_region",
            lookup: {
              "Global": "Global",
              "North America": "North America",
              "Europe": "Europe",
              "South America": "South America",
              "Africa": "Africa",
              "Asia": "Asia",
              "Australia": "Australia"
            }
          },
          {
            title: "Target Demographic",
            field: "target_entrepreneur_demographic",
            lookup: {
              "Minority Business Enterprise": "Minority Business Enterprise",
              "Women Business Enterprise": "Women Business Enterprise",
              "Disadvantaged Business Enterprise":
                "Disadvantaged Business Enterprise",
              "Veteran Business Enterprise": "Veteran Business Enterprise",
              "Other": "Other",
              "All": "All"
            }
          },
          {
            title: "Early Stage Funding",
            field: "early_stage_funding",
            lookup: {
              "true": "Yes",
              "false": "No"
            }
          }
        ]}
        data={props.data}
        options={{
          headerStyle: {
            fontFamily: "Nunito Sans",
            fontSize: "1em",
            color: "#3A3A3A",
            // letterSpacing: "0.025em",
            fontWidth: 700,
            backgroundColor: "#83D7D1"
          }
          // rowStyle: rowData => ({
          //     backgroundColor: (rowData.requests.length > 0) ? '#EF7B5C' : 'none'
          // })
        }}
        detailPanel={[
          {
            tooltip: "Suggestions",
            icon: cellData => (
              <ChevronRightIcon
                style={{ color: cellData.length > 0 ? "#EF7B5C" : "" }}
              />
            ),
            // cellData.length > 0 ? "yellow" : "inherit"
            render: rowData => (<GrantSuggestionList rowData={rowData} />)
          }
        ]}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                let filteredData = Object.assign({}, newData);
                delete filteredData.requests;
                props.postGrants(filteredData);
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  let filteredData = Object.assign({}, newData);
                  delete filteredData.requests;
                  props.putGrants(
                    {
                      ...filteredData,
                      details_last_updated: moment().format("YYYY-MM-DD")
                    },
                    props.currentUser
                  );
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  delete oldData.requests;
                  props.deleteGrants(oldData.id, props.currentUser);
                }
              }, 600);
            })
        }}
        zeroMinWidth
      />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    error: state.error,
    isFetching: state.isFetching,
    data: state.filteredGrants,
    grantStore: state.data,
    currentUser: state.currentUser,
    savedFilters: state.filters,
    columns: state.columns
  };
};

export default connect(
  mapStateToProps,
  { fetchApi, adminFetchApi, postGrants, putGrants, deleteGrants, deleteSuggestion }
)(GrantTable);
