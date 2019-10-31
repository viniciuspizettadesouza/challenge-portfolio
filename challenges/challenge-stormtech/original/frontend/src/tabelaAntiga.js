
  function OrderByFourthScenario() {
    try {
      let book = null
      book.sort()
    } catch{
      alert('Sorting Service Exception')
      throw new Error('Sorting Service Exception')
    }
  }