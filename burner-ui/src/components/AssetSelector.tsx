import React, { useState } from 'react';
import { Asset } from '@burner-wallet/assets';
import AccountBalance from '../data-providers/AccountBalance';
import Assets from '../data-providers/Assets';
const classes = require('./AssetSelector.module.css');

const AssetElement: React.FC<{asset: Asset}> = ({ asset }) => (
  <div className={classes.assetElement}>
    <div className={classes.assetName}>{asset.name}</div>
    <AccountBalance asset={asset} render={(err, data) => data && (
      <div className={classes.assetBalance}>
        {data.usdBalance ? `$${data.usdBalance}` : data.displayBalance}
      </div>
    )} />
  </div>
);

export interface AssetSelectorProps {
  selected: Asset | null;
  onChange: (asset: Asset) => void;
  disabled?: boolean;
}

const AssetSelector: React.FC<AssetSelectorProps> = ({ selected, onChange, disabled }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Assets render={assets => {
      if (!selected) {
        onChange(assets[0]);
      }
      const selectedAsset = assets.filter(asset => asset === selected)[0];
      return (
        <div className={classes.selectContainer}>
          <div onClick={() => setOpen(!isOpen)} className={classes.selectBox}>
            {selectedAsset && <AssetElement asset={selectedAsset} />}
          </div>
          {isOpen && !disabled && (
            <div className={classes.selectDropdown}>
              {assets.map(asset => (
                <div key={asset.id} className={classes.dropdownItem} onClick={() => {
                  setOpen(false);
                  onChange(asset);
                }}>
                  <AssetElement asset={asset} />
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }} />
  );
};

export default AssetSelector;
