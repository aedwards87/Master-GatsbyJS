import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

function createPatchFrom(value) {
  return PatchEvent.from(value === '' ? unset() : set(Number(value)));
}

const formatMoney = Intl.NumberFormat('en-UK', {
  style: 'currency',
  currency: 'GBP',
}).format;

export default function PriceInput({ type, value, onChange, inputComponent }) {
  return (
    <div>
      <div className="DefaultFormField_header_1cg3f">
        <div className="DefaultFormField_headerMain_V5VSl">
          <div className="DefaultLabel_root_1vtRm forms_label_3VbRA DefaultFormField_label_1lrxP DefaultLabel_level_1_1NA0j forms_headingLevel_1_20wsC forms_label_3VbRA">
            {type.title} - {value ? formatMoney(value / 100) : ''}
          </div>
          <div className="DefaultFormField_description_385bE text-blocks_description_uNil_ text-blocks_small_3gnjM text-blocks_base_37xpS text-blocks_root_1n-qL">
            {type.description}
          </div>
        </div>
      </div>
      <input
        className="DefaultTextInput_input_2wVzD text-input_textInput_31n9_ text-input_root_1xAqy"
        type={type.name}
        value={value}
        onChange={(event) => onChange(createPatchFrom(event.target.value))}
        ref={inputComponent}
      />
    </div>
  );
}

PriceInput.focus = function () {
  this._inputElement.focus();
};
