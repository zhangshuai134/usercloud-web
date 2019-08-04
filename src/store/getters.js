const getters = {
    gCountry: state => {
        const list = [];
        state.countryOption.forEach(c => {
            list.push({val: c.id, label: c[state.lang + 'name']})
        });
        return list;
    },
    gPhonex: state => {
        const list = [];
        state.countryOption.forEach(c => {
            c.phoneCode && list.push(c.phoneCode)
        });
        return list;
    },
    gBd: state => {
        const list = [];
        state.bdOption.forEach(c => {
            list.push({val: c.id, label: c['name'], email: c.email, phone: c.phone})
        });
        return list;
    },
    dateStr: state => {
        if (state.filterUpdata.startDay && state.filterUpdata.endDay) {
            if (new Date(state.filterUpdata.endDay).toLocaleDateString() === new Date().toLocaleDateString()) {
                const dateDiff = new Date(state.filterUpdata.endDay).getTime() - new Date(state.filterUpdata.startDay).getTime()
                const dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)) + 1
                return ['dayDiff', dayDiff]
            } else {
                return [state.filterUpdata.startDay, state.filterUpdata.endDay]
            }
        }

    },
    gCompanyType: state => {
        const list = [];
        state.offlineCompanyType.forEach(c => {
            list.push({val: c.typeId, label: c.typeName})
        });
        return list;
    },
    gCompanyAll: state => {
        const list = [];
        state.offlineCompany.forEach(c => {
            list.push({val: c, label: c})
        });
        return list;
    }
}
export default getters
