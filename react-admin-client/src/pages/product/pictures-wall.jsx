import React, { Component } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, message } from 'antd';
import { reqDeleteImg } from '../../api/index'
import PropTypes from 'prop-types'
import { BASE_IMG_URL } from '../../utils/contants';
/*
用于图片上传的组件
 */

// const getBase64 = (file) =>
//     new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//     });
export default class PictureWall extends Component {
    static propTypes = {
        imgs: PropTypes.array//imgs可能为空数组，如果点击添加则为空，如果是点击修改
    }

    state = {
        previewVisible: false, // 标识是否显示大图预览Modal
        previewImage: '', // 大图的url
        fileList: [
            // {
            //     uid: '-1', // 每个file都有自己唯一的id
            //     name: 'xxx.png', // 图片文件名
            //     status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
            //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png', // 图片地址
            // },
        ],
    }
    constructor(props) {
        super(props)

        let fileList = []

        // 如果传入了imgs属性
        const { imgs } = this.props
        if (imgs && imgs.length > 0) {
            fileList = imgs.map((img, index) => ({
                uid: -index, // 每个file都有自己唯一的id
                name: img, // 图片文件名
                status: 'done', // 图片状态: done-已上传, uploading: 正在上传中, removed: 已删除
                url: BASE_IMG_URL + img
            }))
        }

        // 初始化状态
        this.state = {
            previewVisible: false, // 标识是否显示大图预览Modal
            previewImage: '', // 大图的url
            fileList // 所有已上传图片的数组
        }
    }
    /*
    获取所有已上传图片文件名的数组
     */
    getImgs = () => {
        return this.state.fileList.map(file => file.name)
    }

    /*
 隐藏Modal
  */
    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = file => {
        console.log('handlePreview()', file)
        // 显示指定file对应的大图
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    };
    // handlePreview = async (file) => {
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }
    //     this.setState({
    //         previewImage: file.url || file.preview,
    //         previewVisible: true,
    //     })
    // };

    /*
  file: 当前操作的图片文件(上传/删除)
  fileList: 所有已上传图片文件对象的数组
   */
    handleChange = async ({ file, fileList }) => {
        console.log('handleChange()', file.status, fileList.length, fileList)
        // 一旦上传成功, 将当前上传的file的信息修正(name, url)      
        if (file.status === 'done') {
            const result = file.response//{status: 0, data: {name: 'xxx.jpg', url: '图片地址'}}
            if (result.status === 0) {
                message.success('上传成功！')
                const { name, url } = result.data
                file = fileList[fileList.length - 1]//因为添加图片肯定添加到数组的最后一个
                //file和数组做个一个文件信息一样，但指的不是同一个对象，所以file内容改了，fileList没有改
                file.name = name
                file.url = url
            } else {
                message.error('上传失败！')
            }
        } else if (file.status === 'removed') {//界面已经删除，后台服务器也要进行删除
            const result = await reqDeleteImg(file.name)//这里面的参数不能写fileList.length - 1，因为前台已经删除
            if (result.status === 0) {
                message.success('删除图片成功！')
            } else {
                message.error('删除图片失败！')
            }
        }
        // 在操作(上传/删除)过程中更新fileList状态
        this.setState({ fileList })
    };



    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8, }}>Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    action="/manage/img/upload" /*上传图片的接口地址*/
                    accept='image/*'  /*只接收图片格式*/
                    name='image' /*请求参数名*/
                    listType="picture-card"  /*卡片样式*/
                    fileList={fileList}  /*所有已上传图片文件对象的数组*/
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= 4 ? null : uploadButton}
                </Upload>

                <Modal open={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        )
    }
}
