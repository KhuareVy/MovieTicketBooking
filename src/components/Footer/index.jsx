import React from 'react'
import styles from './Footer.module.css'
import { VideoCameraFilled, FacebookFilled, YoutubeFilled, InstagramFilled  } from '@ant-design/icons'
const Footer = () => {
  return (
    <>
    <div className={styles.footer}>
        <div className={styles.col}>
            <h3>Giới thiệu</h3>
            <a href="#">Về chúng tôi</a>
            <a href="#">Chính sách bảo mật</a>
            <a href="#">Thỏa thuận sử dụng</a>
            <a href="#">Quy chế hoạt động</a>
        </div>

        <div className={styles.col}>
            <h3>Hỗ trợ</h3>
            <a href="#">Góp ý</a>
            <a href="#">Rạp/Giá vé</a>
            <a href="#">FAQ</a>
        </div>

        <div className={styles.col}>
            <a className={styles.logo} href="#"><VideoCameraFilled style={{ fontSize: '30px', color: '#f5811f' }} /></a>
            <div className={styles.icon}>
            <a href="#"><FacebookFilled style={{ fontSize: '40px', margin: '0 10px' }} /></a>
            <a href="#"><YoutubeFilled style={{ fontSize: '40px', margin: '0 10px' }} /></a>
            <a href="#"><InstagramFilled style={{ fontSize: '40px', margin: '0 10px' }} /></a>
            </div>
        </div>
       
        <div className={styles.copyright}>
           <p>©2024</p>
        </div>
    </div>
  </>
  )
}

export default Footer