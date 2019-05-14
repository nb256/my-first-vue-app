import { customerService } from '../_services';
import { router } from '../_helpers';

const state = {
    all: {}
};

const actions = {
    getAll({ commit }, {page}) {
        commit('getAllRequest');

        customerService.getAll({page})
            .then(
                (users) => commit('getAllSuccess', {users}),
                error => commit('getAllFailure', error)
            );
    },

    // delete({ commit }, id) {
    //     commit('deleteRequest', id);

    //     customerService.delete(id)
    //         .then(
    //             user => commit('deleteSuccess', id),
    //             error => commit('deleteSuccess', { id, error: error.toString() })
    //         );
    // },
    changeStatus({ commit }, {page, id}) {
        commit('getAllRequest');

        customerService.changeStatus({id})
            .then(
                () => {
                    customerService.getAll({page})
                    .then(
                        (users,page) => commit('getAllSuccess', {users}),
                        error => commit('getAllFailure', error)
                    );
                },
                error => commit('getAllFailure', error)
            );
    },
    
    createCustomer({ dispatch, commit }, customer) {
    
        customerService.createCustomer(customer)
            .then(
                user => {
                    router.push('/');
                    setTimeout(() => {
                        // display success message after route change completes
                        dispatch('alert/success', 'Created successfully', { root: true });
                    })
                },
                error => {
                    dispatch('alert/error', "Could not be created", { root: true });
                }
            );
    }
};

const mutations = {
    getAllRequest(state) {
        state.all = { loading: true };
    },
    getAllSuccess(state, {users}) {
        state.all = { items: users.data.data, totalCount: users.data.totalCount };
    },
    getAllFailure(state, error) {
        state.all = { error };
    },
    deleteRequest(state, id) {
        // add 'deleting:true' property to user being deleted
        state.all.items = state.all.items.map(user =>
            user.id === id
                ? { ...user, deleting: true }
                : user
        )
    },
    deleteSuccess(state, id) {
        // remove deleted user from state
        state.all.items = state.all.items.filter(user => user.id !== id)
    },
    deleteFailure(state, { id, error }) {
        // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
        state.all.items = state.items.map(user => {
            if (user.id === id) {
                // make copy of user without 'deleting:true' property
                const { deleting, ...userCopy } = user;
                // return copy of user with 'deleteError:[error]' property
                return { ...userCopy, deleteError: error };
            }

            return user;
        })
    }
};

export const customers = {
    namespaced: true,
    state,
    actions,
    mutations
};
