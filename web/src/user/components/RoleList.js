/**
 * @file RoleList component 角色列表
 * @author zlc <lichao9182@126.com>
 */

import React, {PropTypes, Component} from 'react'

export default class RoleList extends Component {

    static propTypes = {
        roleList: PropTypes.array.isRequired,
        show: PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props)
    }

    render() {
        let {roleList, show} = this.props;

        if (!roleList) {
            roleList = [];
        }

        return (
            <div className="gf-ronames"
                style={{display: show ? 'block' : 'none'}}
                onClick={::this.selectRoleName}
            >
                {roleList.map(item => {
                    return (
                        <span key={item.role}>{item.roleName}</span>
                    )
                })}
            </div>
        )
    }

    selectRoleName(ev) {
        console.log('---select: ', ev.target);
    }

}
