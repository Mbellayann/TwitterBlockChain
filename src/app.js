App = {
  loading: false,
  contracts: {},

  load: async () => {
    await App.loadWeb3()
    await App.loadAccount()
    await App.loadContract()
    await App.loadContractSportTweet()
    await App.render()
  },

  // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
  loadWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
      web3 = new Web3(web3.currentProvider)
    } else {
      window.alert("Please connect to Metamask.")
    }
    // Modern dapp browsers...
    if (window.ethereum) {
      window.web3 = new Web3(ethereum)
      try {
        // Request account access if needed
        await ethereum.enable()
        // Acccounts now exposed
        web3.eth.sendTransaction({/* ... */})
      } catch (error) {
        // User denied account access...
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = web3.currentProvider
      window.web3 = new Web3(web3.currentProvider)
      // Acccounts always exposed
      web3.eth.sendTransaction({/* ... */})
    }
    // Non-dapp browsers...
    else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  },

  loadAccount: async () => {
    // Set the current blockchain account
    App.account = web3.eth.accounts[0]
  },

  loadContract: async () => {
    // Create a JavaScript version of the smart contract
    const generalTweet = await $.getJSON('GeneralTweet.json')
    App.contracts.GeneralTweet = TruffleContract(generalTweet)
    App.contracts.GeneralTweet.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.generalTweet = await App.contracts.GeneralTweet.deployed()
  },

  loadContractSportTweet: async () => {
    // Create a JavaScript version of the smart contract
    const sporttweetcontract = await $.getJSON('SportTweet.json')
    App.contracts.SportTweet = TruffleContract(sporttweetcontract)
    App.contracts.SportTweet.setProvider(App.web3Provider)

    // Hydrate the smart contract with values from the blockchain
    App.sporttweetcontract = await App.contracts.SportTweet.deployed()
  },

  render: async () => {
    // Prevent double render
    if (App.loading) {
      return
    }

    // Update app loading state
    App.setLoading(true)

    // Render Account
    $('#account').html(App.account)

    // Render Tasks
    await App.renderSportTweet()

    // Update loading state
    App.setLoading(false)
  },

  

  renderSportTweet: async () => {
    // Load the total sport tweets count from the blockchain
    const tweetCount = await App.sporttweetcontract.tweetCount()
    console.log('ici',tweetCount)
    const $tweetTemplate = $('.tweetTemplate')

    // Render out each task with a new task template
    for (var i = 1; i <= tweetCount; i++) {
      // Fetch the tweet data from the blockchain
      const tweet = await App.sporttweetcontract.sporttweet(i)
      const tweetId = tweet[0].toNumber()
      console.log(tweetId)
      const tweetContent = tweet[1]
      const tweetCompleted = tweet[2]
      // Create the html for the task
    const $newTweetTemplate = $tweetTemplate.clone()
    $newTweetTemplate.find('.content').html(tweetContent)
    console.log(tweetContent)
    $newTweetTemplate.find('.span')
                    .prop('name', tweetId)
                    .prop('content', tweetContent)
                    //.on('click', App.toggleCompleted)

    // Show the task
    if (tweetContent) {
      console.log("ok is not empty")
      $('#completedTaskList').append($newTweetTemplate)
      $newTweetTemplate.show()
    } 
    
    }
  },

  createTask: async () => {
    App.setLoading(true)
    const content = $('#newTask').val()
    await App.generalTweet.createTask(content)
    window.location.reload()
  },

  createTweet: async () => {
    App.setLoading(true)
    const content = $('#newTweet').val()
    await App.sporttweetcontract.createSportTweet(content)
    window.location.reload()
  },

  createLike: async () => {
    
    const tweetCount = await App.sporttweetcontract.tweetCount()
    for (var i = 1; i <= tweetCount; i++) {
      // Fetch the tweet data from the blockchain
      const tweet = await App.sporttweetcontract.sporttweet(i)
      //here we have to compare what is in the tweet or the id of the tweet
      //const tweetId = tweet[0].toNumber() then put it in the method like tweet to return us the number of
      //like
      //const tweetnumber = await App.sporttweetcontract.createLikeTweet(tweetId)
    }
    //then set the app to put the tweet number count on the feed
      //App.setLoading(true)
      //const content = $('#tweetNumb').val()
      //console.log(content)
    
    window.location.reload()
  },

  toggleCompleted: async (e) => {
    App.setLoading(true)
    const taskId = e.target.name
    await App.generalTweet.toggleCompleted(taskId)
    window.location.reload()
  },

  setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
}

$(() => {
  $(window).load(() => {
    App.load()
  })
})
