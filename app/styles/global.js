let styles = {

  screen: {
    flex: 1,
    backgroundColor: '#c09667',
    justifyContent: 'space-between'
  },

  navigationBar: {
    backgroundColor: '#fbaf40',
    padding: 5,
    paddingTop: 25,
    borderColor: '#d98727',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navigationBarItem: {
    width: 200,
    flexDirection: 'row'
  },
  navigationBarItemText: {
    fontSize: 14,
    color: '#ffffff'
  },
  navigationBarHeading: {
    flex: 1,
    fontSize: 24,
    textAlign: 'center',
    color: '#ffffff'
  },

  scrollViewContainer: {
    padding: 10
  },

  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fbaf40',
    borderWidth: 1,
    borderColor: '#d98727'
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18
  },

  text: {
    fontSize: 20,
    marginBottom: 5
  },

  square: {
    margin: 5,
    borderColor: '#d98727',
    borderWidth: 1
  },
  squareLabel: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 5
  },
  squareLabelText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center'
  },
  squareMark: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent'
  },

  grid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  boardRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  modalContent: {
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#dddddd'
  },
  modalHeader: {
    marginBottom: 10
  },
  modalBody: {
    marginBottom: 20
  }

};

export default {

  ...styles,

  gridSquare: {
    ...styles.square,
    margin: 10
  },

  buttonAlternate: {
    ...styles.button,
    backgroundColor: '#ffffff',
    borderColor: '#dadada'
  },
  buttonAlternateText: {
    ...styles.buttonText,
    color: '#000000'
  }

}
