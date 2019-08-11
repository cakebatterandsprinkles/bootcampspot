import React from "react";

class FormBlock extends React.Component {
    render () {
        return   <div>
      <label className="block tracking-wide text-xs mb-2 text-gray-dark">
        {this.props.labelText}
      </label>
      <div className="block text-gray-700 w-full flex">
        <input name={this.props.name} onChange={this.props.onChange} value={this.props.value} className="appearance-none block w-full border border-gray-border py-3 px-4 leading-tight text-xs text-gray-text" type={this.props.type} placeholder={this.props.placeholderText} />
      </div>
    </div>
    }
}

export default FormBlock;