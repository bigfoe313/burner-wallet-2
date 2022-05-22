import React, { Fragment, useState, useEffect, useRef } from 'react';
import { useBurner } from '../BurnerProvider';
const POLL_INTERVAL = 1000;
const CACHE_EXPIRATION = 3000;
const balanceCache = {};
const getCache = (key) => balanceCache[key] && (Date.now() - balanceCache[key].timestamp < CACHE_EXPIRATION)
    ? balanceCache[key]
    : null;
const setCache = (key, val) => {
    balanceCache[key] = { ...val, timestamp: Date.now() };
};
const getBalance = async (asset, account) => {
    const cacheKey = `${asset.id}-${account}`;
    const cachedVal = getCache(cacheKey);
    if (cachedVal) {
        return cachedVal;
    }
    const [balance, maximumSendableBalance, growthRate] = await Promise.all([
        asset.getBalance(account),
        asset.getMaximumSendableBalance(account),
        asset.getGrowthRate ? asset.getGrowthRate(account) : Promise.resolve('0'),
    ]);
    const returnVal = { balance, maximumSendableBalance, growthRate };
    setCache(cacheKey, returnVal);
    return returnVal;
};
const AccountBalance = ({ render, asset, account }) => {
    const [data, setData] = useState(null);
    const dataRef = useRef(null);
    const _isMounted = useRef(true);
    const timer = useRef(null);
    const { assets, defaultAccount } = useBurner();
    const _account = account || defaultAccount;
    const getAsset = () => {
        if (typeof asset !== 'string') {
            return asset;
        }
        const assetList = assets.filter(_asset => _asset.id == asset);
        if (assetList.length == 0) {
            throw new Error(`Unable to find asset ${asset}`);
        }
        return assetList[0];
    };
    const fetchData = async () => {
        try {
            const _asset = getAsset();
            const { balance, maximumSendableBalance, growthRate } = await getBalance(_asset, _account);
            if (!_isMounted.current) {
                return;
            }
            let usdBalance = null;
            try {
                usdBalance = _asset.getUSDValue(balance);
            }
            catch (e) { }
            const _data = {
                asset: _asset,
                balance,
                displayBalance: _asset.getDisplayValue(balance),
                maximumSendableBalance,
                displayMaximumSendableBalance: _asset.getDisplayValue(maximumSendableBalance),
                usdBalance,
                growthRate,
            };
            if (!dataRef.current
                || _data.balance !== dataRef.current.balance
                || _data.usdBalance !== dataRef.current.usdBalance) {
                setData(_data);
                dataRef.current = _data;
            }
        }
        catch (err) {
            console.warn('[AccountBalance]', err);
        }
    };
    useEffect(() => {
        fetchData();
        let running = true;
        const poll = async () => {
            await fetchData();
            if (running) {
                timer.current = window.setTimeout(poll, POLL_INTERVAL);
            }
        };
        poll();
        return () => {
            running = false;
            if (timer.current) {
                window.clearTimeout(timer.current);
            }
        };
    }, [_account, asset]);
    useEffect(() => {
        return () => {
            _isMounted.current = false;
        };
    }, []);
    return (React.createElement(Fragment, null, render(data)));
};
export default AccountBalance;
//# sourceMappingURL=AccountBalance.js.map