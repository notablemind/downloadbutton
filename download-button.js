!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.DownloadButton=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){

var React = _dereq_('react/addons')
  , cx = React.addons.classSet
  , PT = React.PropTypes

  , saveAs = _dereq_('./save-as')

var DownloadButton = React.createClass({displayName: "DownloadButton",
  propTypes: {
    fileData: PT.object,
    genFile: PT.func,
    async: PT.bool,
    generateTitle: PT.string,
    downloadTitle: PT.oneOfType([PT.string, PT.func]),
    loadingTitle: PT.string,
    onDownloaded: PT.func,
  },

  getDefaultProps: function () {
    return {
      async: false,
      downloadTitle: 'Download',
      generateTitle: 'Generate file',
      loadingTitle: 'Loading...',
    }
  },

  getInitialState: function () {
    return {
      loading: false,
      fileData: null,
    }
  },

  _onGenerate: function () {
    this.setState({loading: true, fileData: null})
    this.props.genFile(this._donePreparing)
  },

  _donePreparing: function (fileData) {
    this.setState({
      loading: false,
      fileData: fileData,
    })
  },

  _onDownload: function () {
    var fileData = this.props.fileData || (this.props.async ? this.state.fileData : this.props.genFile())
    if (!fileData) {
      return false
    }
    var blob = new Blob([fileData.contents], {type: fileData.mime})
      , url = URL.createObjectURL(blob)
    saveAs(url, fileData.filename)
    this.props.onDownloaded && this.props.onDownloaded()
  },

  render: function () {
    // need one or the other
    if (!this.props.genFile && !this.props.fileData) {
      return React.createElement("em", null, "Invalid configuration for download button")
    }
    var style = this.props.style
      , cls = 'DownloadButton ' + (this.props.className || '')

    if (this.props.fileData || !this.props.async || this.state.fileData) {
      var title = this.props.downloadTitle
      if ('function' === typeof title) {
        title = title(this.props.fileData || this.state.fileData)
      }
      return React.createElement("button", {style: style, onClick: this._onDownload, className: cls}, 
        title
      )
    }

    if (this.state.loading) {
      return React.createElement("button", {style: style, className: cls + ' DownloadButton-loading'}, 
        this.props.loadingTitle
      )
    }

    return React.createElement("button", {style: style, onClick: this._onGenerate, className: cls + ' DownloadButton-generate'}, 
      this.props.generateTitle
    )
  }
})

module.exports = DownloadButton



},{"./save-as":2,"react/addons":"g51q1L"}],2:[function(_dereq_,module,exports){

module.exports = saveAs

// from http://stackoverflow.com/questions/283956/
function saveAs(uri, filename) {
  var link = document.createElement('a');
  if (typeof link.download === 'string') {
    document.body.appendChild(link); //Firefox requires the link to be in the body
    link.download = filename;
    link.href = uri;
    link.click();
    document.body.removeChild(link); //remove the link when done
  } else {
    location.replace(uri);
  }
}



},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2phcmVkLy5udm0vdjAuMTAuMzMvbGliL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qYXJlZC9jbG9uZS9ubS9yZWFjdC1kb3dubG9hZC9pbmRleC5qcyIsIi9ob21lL2phcmVkL2Nsb25lL25tL3JlYWN0LWRvd25sb2FkL3NhdmUtYXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUM7SUFDL0IsRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUTtBQUM5QixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsU0FBUzs7QUFFeEIsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQzs7QUFFakMsSUFBSSxvQ0FBb0MsOEJBQUE7RUFDdEMsU0FBUyxFQUFFO0lBQ1QsUUFBUSxFQUFFLEVBQUUsQ0FBQyxNQUFNO0lBQ25CLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBSTtJQUNoQixLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUk7SUFDZCxhQUFhLEVBQUUsRUFBRSxDQUFDLE1BQU07SUFDeEIsYUFBYSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqRCxZQUFZLEVBQUUsRUFBRSxDQUFDLE1BQU07SUFDdkIsWUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJO0FBQ3pCLEdBQUc7O0VBRUQsZUFBZSxFQUFFLFlBQVksQ0FBQztJQUM1QixPQUFPO01BQ0wsS0FBSyxFQUFFLEtBQUs7TUFDWixhQUFhLEVBQUUsVUFBVTtNQUN6QixhQUFhLEVBQUUsZUFBZTtNQUM5QixZQUFZLEVBQUUsWUFBWTtLQUMzQjtBQUNMLEdBQUc7O0VBRUQsZUFBZSxFQUFFLFlBQVksQ0FBQztJQUM1QixPQUFP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QUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFFLEtBQUssRUFBQyxDQUFDLE9BQUEsRUFBTyxDQUFFLElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxTQUFBLEVBQVMsQ0FBRSxHQUFHLEdBQUcsMEJBQTRCLENBQUEsRUFBQTtNQUNsRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWM7SUFDbkIsQ0FBQTtHQUNWO0FBQ0gsQ0FBQyxDQUFDOztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYzs7Ozs7QUN2Ri9CO0FBQ0EsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNOztBQUV2QixrREFBa0Q7QUFDbEQsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDO0VBQzlCLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDdkMsSUFBSSxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO0lBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQ2hCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNiLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ2pDLE1BQU07SUFDTCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQ3ZCO0FBQ0gsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcbnZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0L2FkZG9ucycpXG4gICwgY3ggPSBSZWFjdC5hZGRvbnMuY2xhc3NTZXRcbiAgLCBQVCA9IFJlYWN0LlByb3BUeXBlc1xuXG4gICwgc2F2ZUFzID0gcmVxdWlyZSgnLi9zYXZlLWFzJylcblxudmFyIERvd25sb2FkQnV0dG9uID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBwcm9wVHlwZXM6IHtcbiAgICBmaWxlRGF0YTogUFQub2JqZWN0LFxuICAgIGdlbkZpbGU6IFBULmZ1bmMsXG4gICAgYXN5bmM6IFBULmJvb2wsXG4gICAgZ2VuZXJhdGVUaXRsZTogUFQuc3RyaW5nLFxuICAgIGRvd25sb2FkVGl0bGU6IFBULm9uZU9mVHlwZShbUFQuc3RyaW5nLCBQVC5mdW5jXSksXG4gICAgbG9hZGluZ1RpdGxlOiBQVC5zdHJpbmcsXG4gICAgb25Eb3dubG9hZGVkOiBQVC5mdW5jLFxuICB9LFxuXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBhc3luYzogZmFsc2UsXG4gICAgICBkb3dubG9hZFRpdGxlOiAnRG93bmxvYWQnLFxuICAgICAgZ2VuZXJhdGVUaXRsZTogJ0dlbmVyYXRlIGZpbGUnLFxuICAgICAgbG9hZGluZ1RpdGxlOiAnTG9hZGluZy4uLicsXG4gICAgfVxuICB9LFxuXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgIGZpbGVEYXRhOiBudWxsLFxuICAgIH1cbiAgfSxcblxuICBfb25HZW5lcmF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe2xvYWRpbmc6IHRydWUsIGZpbGVEYXRhOiBudWxsfSlcbiAgICB0aGlzLnByb3BzLmdlbkZpbGUodGhpcy5fZG9uZVByZXBhcmluZylcbiAgfSxcblxuICBfZG9uZVByZXBhcmluZzogZnVuY3Rpb24gKGZpbGVEYXRhKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICAgIGZpbGVEYXRhOiBmaWxlRGF0YSxcbiAgICB9KVxuICB9LFxuXG4gIF9vbkRvd25sb2FkOiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZpbGVEYXRhID0gdGhpcy5wcm9wcy5maWxlRGF0YSB8fCAodGhpcy5wcm9wcy5hc3luYyA/IHRoaXMuc3RhdGUuZmlsZURhdGEgOiB0aGlzLnByb3BzLmdlbkZpbGUoKSlcbiAgICBpZiAoIWZpbGVEYXRhKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgdmFyIGJsb2IgPSBuZXcgQmxvYihbZmlsZURhdGEuY29udGVudHNdLCB7dHlwZTogZmlsZURhdGEubWltZX0pXG4gICAgICAsIHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYilcbiAgICBzYXZlQXModXJsLCBmaWxlRGF0YS5maWxlbmFtZSlcbiAgICB0aGlzLnByb3BzLm9uRG93bmxvYWRlZCAmJiB0aGlzLnByb3BzLm9uRG93bmxvYWRlZCgpXG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gbmVlZCBvbmUgb3IgdGhlIG90aGVyXG4gICAgaWYgKCF0aGlzLnByb3BzLmdlbkZpbGUgJiYgIXRoaXMucHJvcHMuZmlsZURhdGEpIHtcbiAgICAgIHJldHVybiA8ZW0+SW52YWxpZCBjb25maWd1cmF0aW9uIGZvciBkb3dubG9hZCBidXR0b248L2VtPlxuICAgIH1cbiAgICB2YXIgc3R5bGUgPSB0aGlzLnByb3BzLnN0eWxlXG4gICAgICAsIGNscyA9ICdEb3dubG9hZEJ1dHRvbiAnICsgKHRoaXMucHJvcHMuY2xhc3NOYW1lIHx8ICcnKVxuXG4gICAgaWYgKHRoaXMucHJvcHMuZmlsZURhdGEgfHwgIXRoaXMucHJvcHMuYXN5bmMgfHwgdGhpcy5zdGF0ZS5maWxlRGF0YSkge1xuICAgICAgdmFyIHRpdGxlID0gdGhpcy5wcm9wcy5kb3dubG9hZFRpdGxlXG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIHRpdGxlKSB7XG4gICAgICAgIHRpdGxlID0gdGl0bGUodGhpcy5wcm9wcy5maWxlRGF0YSB8fCB0aGlzLnN0YXRlLmZpbGVEYXRhKVxuICAgICAgfVxuICAgICAgcmV0dXJuIDxidXR0b24gc3R5bGU9e3N0eWxlfSBvbkNsaWNrPXt0aGlzLl9vbkRvd25sb2FkfSBjbGFzc05hbWU9e2Nsc30+XG4gICAgICAgIHt0aXRsZX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIH1cblxuICAgIGlmICh0aGlzLnN0YXRlLmxvYWRpbmcpIHtcbiAgICAgIHJldHVybiA8YnV0dG9uIHN0eWxlPXtzdHlsZX0gY2xhc3NOYW1lPXtjbHMgKyAnIERvd25sb2FkQnV0dG9uLWxvYWRpbmcnfT5cbiAgICAgICAge3RoaXMucHJvcHMubG9hZGluZ1RpdGxlfVxuICAgICAgPC9idXR0b24+XG4gICAgfVxuXG4gICAgcmV0dXJuIDxidXR0b24gc3R5bGU9e3N0eWxlfSBvbkNsaWNrPXt0aGlzLl9vbkdlbmVyYXRlfSBjbGFzc05hbWU9e2NscyArICcgRG93bmxvYWRCdXR0b24tZ2VuZXJhdGUnfT5cbiAgICAgIHt0aGlzLnByb3BzLmdlbmVyYXRlVGl0bGV9XG4gICAgPC9idXR0b24+XG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gRG93bmxvYWRCdXR0b25cblxuIiwiXG5tb2R1bGUuZXhwb3J0cyA9IHNhdmVBc1xuXG4vLyBmcm9tIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjgzOTU2L1xuZnVuY3Rpb24gc2F2ZUFzKHVyaSwgZmlsZW5hbWUpIHtcbiAgdmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGlmICh0eXBlb2YgbGluay5kb3dubG9hZCA9PT0gJ3N0cmluZycpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspOyAvL0ZpcmVmb3ggcmVxdWlyZXMgdGhlIGxpbmsgdG8gYmUgaW4gdGhlIGJvZHlcbiAgICBsaW5rLmRvd25sb2FkID0gZmlsZW5hbWU7XG4gICAgbGluay5ocmVmID0gdXJpO1xuICAgIGxpbmsuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspOyAvL3JlbW92ZSB0aGUgbGluayB3aGVuIGRvbmVcbiAgfSBlbHNlIHtcbiAgICBsb2NhdGlvbi5yZXBsYWNlKHVyaSk7XG4gIH1cbn1cblxuIl19
(1)
});
