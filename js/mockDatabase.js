// mockDatabase.js - Temporary database module simulating RDS data

export const workspaces = [
    {
      workspace_id: 1,
      name: "Open Desk Area",
      location: "Downtown Branch",
      type: "desk",
      price: 15,
      availability_status: "available",
      floor_plan_image_url: "assets/images/floorplan.png"
    },
    {
      workspace_id: 2,
      name: "Private Office A",
      location: "Midtown Branch",
      type: "private office",
      price: 50,
      availability_status: "booked",
      floor_plan_image_url: ""
    },
    {
      workspace_id: 3,
      name: "Meeting Room 1",
      location: "Downtown Branch",
      type: "meeting room",
      price: 30,
      availability_status: "available",
      floor_plan_image_url: "assets/images/floorplan.png"
    },
    {
      workspace_id: 4,
      name: "Desk in Open Area",
      location: "Uptown Branch",
      type: "desk",
      price: 20,
      availability_status: "available",
      floor_plan_image_url: ""
    }
  ];
  
  // Function to retrieve workspaces
  export function getWorkspaces() {
    // Later, replace this with an API call to fetch data from AWS RDS
    return workspaces;
  }
  