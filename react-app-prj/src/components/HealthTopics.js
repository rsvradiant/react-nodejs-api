import React from 'react'

export const HealthTopics = ({topics}) => {
    if (topics.length === 0) return null

    const TopicRow = (topic,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  <td>{topic.Id}</td>
                  <td>{topic.Type}</td>
                  <td>{topic.Title}</td>
                  <td>{topic.ParentId}</td>
              </tr>
          )
    }

    const topicTable = topics.map((topic,index) => TopicRow(topic,index))

    return(
        <div className="container">
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>Topic Id</th>
                    <th>Type</th>
                    <th>Title</th>
                    <th>ParentId</th>
                </tr>
                </thead>
                <tbody>
                    {topicTable}
                </tbody>
            </table>
        </div>
    )
}