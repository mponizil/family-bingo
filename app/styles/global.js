export default {
  screen: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'space-between'
  },

  navigationBar: {
    backgroundColor: '#e2e2e2',
    padding: 5,
    borderColor: '#cbcbcb',
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
    fontSize: 14
  },
  navigationBarHeading: {
    flex: 1,
    fontSize: 24,
    textAlign: 'center'
  },

  scrollViewContainer: {
    padding: 10
  },

  instructions: {
    padding: 15,
    backgroundColor: '#e2e2e2',
    borderColor: '#cbcbcb',
    borderStyle: 'solid',
    borderTopWidth: 1
  },
  instructionsText: {
    color: '#181818',
    fontSize: 18
  },

  text: {
    flex: 1,
    color: '#000000',
    fontSize: 18,
    textAlign: 'center'
  },

  grid: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  gridSquare: {
    alignItems: 'center',
    margin: 10
  },

  boardRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  boardSquare: {
    alignItems: 'center'
  },
  squareMark: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center'
  },

  photo: {
    width: 150,
    height: 150
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  modalContent: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    padding: 20,
    marginHorizontal: 20
  },
  modalHeader: {
    marginBottom: 10
  },
  modalBody: {
    marginBottom: 20
  }
};
