module.exports = {
    not_service: require('./not_service'),
    non_dependency_service: require('./non_dependency_service'),
    not_implemented_service: require('./not_implemented_service'),
    dependency_service: require('./dependency_service'),
    invalid_open_service: require('./invalid_open_service'),
    partition_service: require('./partition_service'),
    cycle_service: require('./cycle_service'),
    duplicated_service: require('./duplicated_service'),
    duplicated_dependency: require('./duplicated_dependency'),
    not_parallel_potential_service: require('./not_parallel_potential_service'),
    parallel_potential_service: require('./parallel_potential_service')
}
