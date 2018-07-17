/**
 * @file csvDownload
 * @author zlc <zhanglc@ganweitech.com>
 */

import React, {Component} from 'react'
import {Link} from 'react-router'
import axios from 'axios'

export default class CsvFetch extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <span onClick={this.fetchCsv.bind(this)}>导出</span>
        )
    }
    fetchCsv(){
        let csv = this.props.parseCsv()
        this.csvDownload(csv)
      }

    csvDownload(csv){
        var element = document.createElement("a");
        element.setAttribute("href", "data:application/csv;charset=utf-8,\ufeff" + encodeURIComponent(csv));
        element.setAttribute("download", "export.csv");
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
  }


  propTypes: {
    url: React.PropTypes.string.isRequired,
    query: React.PropTypes.string.isRequired,
    parseCsv: React.PropTypes.func.isRequired,
  }


}
