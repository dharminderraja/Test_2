const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  button: {
    margin: theme.spacing.unit
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 250
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column"
  },
  orderDetailRow: {
    display: "flex",
    marginBottom: theme.spacing.unit * 3,
    minWidth: 450
  },
  heading: {
    fontSize: 18,
    flex: 1
  },
  secondaryHeading: {
    fontSize: 18,
    flex: 1
  },
  flex1: {
    flex: 1
  },
  servingItem: {
    fontSize: 16,
    margin: theme.spacing.unit * 2
  }
});

export default styles;
