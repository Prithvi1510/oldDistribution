CREATE TABLE IF NOT EXISTS turbine_telemetry (
  timestamp TIMESTAMP,
  turbine_id SYMBOL, -- Tagged for high-performance filtering

  -- Status & Mode(Integers/Bytes)
  turb_status_i32 INT,
  turb_status_ex_i32 INT,
  turb_wyaw_yw_status_i16 INT,
  turb_wapc1_pmusetptup_f32 FLOAT,
  turb_wrpc1_actpmunum_i32 INT,
  turb_count_flsh_active_i32 INT,
  turb_conv_opmode_i32 INT,
  turb_sec_wnd_sens_avlbl_i8 SHORT, -- Mapped byte to short for safety

  -- Production Metrics(Double/R64)
  turb_daily_prod_f64 DOUBLE,
  turb_monthly_prod_f64 DOUBLE,
  turb_yearly_prod_f64 DOUBLE,

  -- Energy Counters(Long/I64)
  turb_dmnd_wh_f64 DOUBLE,
  turb_dmnd_apwh_f64 DOUBLE,

  -- Power & Electrical(Float/F32)
  turb_act_pwr_f32 FLOAT,
  turb_react_pwr_f32 FLOAT,
  turb_apnt_pwr_f32 FLOAT,
  turb_mmxn1_amp_f32 FLOAT,
  turb_mmxui_volt_l1rms_f32 FLOAT,
  turb_mmxui_volt_l2rms_f32 FLOAT,
  turb_mmxui_volt_l3rms_f32 FLOAT,
  turb_mmxui_curnt_i1rms_f32 FLOAT,
  turb_mmxui_curnt_i2rms_f32 FLOAT,
  turb_mmxui_curnt_i3rms_f32 FLOAT,
  turb_tot_wh_f64 DOUBLE,
  turb_tot_apwh_f64 DOUBLE,
  turb_wnac2_extemp_f32 FLOAT,
  turb_mmxn1_vol_f32 FLOAT,
  turb_mmxu1_hz_f32 FLOAT,

  -- Reactive Power Control
  turb_wrpc1_plvar_f32 FLOAT,
  turb_wrpc1_plpf_f32 FLOAT,
  turb_wrpc1_phi_f32 FLOAT,
  turb_wrpc1_tanphi_f32 FLOAT,
  turb_wrpc1_phisp_f32 FLOAT,
  turb_wrpc1_plvsp_f32 FLOAT,
  turb_wrpc1_avlvarcapa_f32 FLOAT,
  turb_wrpc1_avlvarcapcnv_f32 FLOAT,
  turb_wrpc1_avlvarcapv_f32 FLOAT,
  turb_wrpc1_avlvarinda_f32 FLOAT,

  -- Drivetrain & Gearbox
  turb_rot_spd_f32 FLOAT,
  turb_gen_speed_f32 FLOAT,
  turb_speed_gbox_f32 FLOAT,
  turb_press_gbox_f32 FLOAT,
  turb_metl_part_count_f32 FLOAT,

  -- Wind & Environment
  turb_wnac_wnd_speed_f32 FLOAT,
  turb_wnac_wnd_dir_f32 FLOAT,
  turb_wnac_wnd_dir_rel_f32 FLOAT,
  turb_wnac_wnd_dir_rel1_f32 FLOAT,
  turb_wnac_calc_air_dnsty_f32 FLOAT,
  turb_wnac_wnd_abs_dir_f32 FLOAT,
  turb_wnac_wnd_spd_ice_f32 FLOAT,

  -- Hydraulic & Yaw System
  turb_whyd_sys_press_f32 FLOAT,
  turb_whyd_sys_presdrop_f32 FLOAT,
  turb_wayw_yw_angle_f32 FLOAT,
  turb_wayw_cw_f32 FLOAT,
  turb_act_pwr_setpt_f32 FLOAT,
  turb_wyaw_py_f32 FLOAT,

  -- Pitch System
  turb_gen_spd_sp_f32 FLOAT,
  turb_ptch_curnt_bld1_f32 FLOAT,
  turb_ptch_curnt_bld2_f32 FLOAT,
  turb_ptch_curnt_bld3_f32 FLOAT,
  turb_ptch_wr1_ang_bld1_f32 FLOAT,
  turb_ptch_wr1_ang_bld2_f32 FLOAT,
  turb_ptch_wr1_ang_bld3_f32 FLOAT,
  turb_rot_min_ptch_angl_f32 FLOAT,
  turb_wrot1_ptch_stpt1_f32 FLOAT,
  turb_wrot1_ptch_stpt2_f32 FLOAT,
  turb_wrot1_ptch_stpt3_f32 FLOAT,

  -- Temperatures
  turb_hub_temp_f32 FLOAT,
  turb_temp_gbox_oil_input_f32 FLOAT,
  turb_wnac_extern_temp_f32 FLOAT,
  turb_wnac_intl_temp_f32 FLOAT,
  turb_wnac_top_box_temp_f32 FLOAT,
  turb_wnac_cpu_temp_f32 FLOAT,
  turb_wtrm5_drvtrnosc_f32 FLOAT,
  turb_wtow_bbt_temp_f32 FLOAT,
  turb_wtow_it_f32 FLOAT,
  turb_tmp_mot_a1_f32 FLOAT,
  turb_tmp_mot_a2_f32 FLOAT,
  turb_tmp_mot_a3_f32 FLOAT,
  turb_rot_brng_temp_f32 FLOAT,
  turb_temp_shft_brng1_f32 FLOAT,
  turb_temp_shft_brng2_f32 FLOAT,
  turb_temp_shft_brng3_f32 FLOAT,
  turb_temp_shft_brng4_f32 FLOAT,
  turb_temp_gbox_oil_sump_f32 FLOAT,
  turb_gen_stator_temp_f32 FLOAT,
  turb_gen_brng_temp1_f32 FLOAT,
  turb_gen_brng_temp2_f32 FLOAT,
  turb_supply_trf_temp_f32 FLOAT,
  turb_trf_cell_temp_f32 FLOAT,

  -- Structural/Oscillation
  turb_wtow_ox_f32 FLOAT,
  turb_wtow_ox2_f32 FLOAT,
  turb_wtow_oy_f32 FLOAT,
  turb_wtow_oy2_f32 FLOAT,

  -- Converter & Torque
  turb_conv_torq_f32 FLOAT,
  turb_conv_calc_torq_f32 FLOAT,
  turb_conv_rel_torq_f32 FLOAT,

  -- Power Control & Reductions(WAPC)
  turb_wapc1_plwsppm_f32 FLOAT,
  turb_wapc1_plw_f32 FLOAT,
  turb_wapc1_plwsp_f32 FLOAT,
  turb_wapc1_plwred_f32 FLOAT,
  turb_wapc1_plwcalcmax_f32 FLOAT,
  turb_wapc1_plwreddcab_f32 FLOAT,
  turb_wapc1_plwreddc_f32 FLOAT,
  turb_wapc1_plwreddel_f32 FLOAT,
  turb_wapc1_plwreddgn_f32 FLOAT,
  turb_wapc1_plwreddtrf_f32 FLOAT,
  turb_wapc1_plwreddtrm_f32 FLOAT,
  turb_wapc1_plwredpm_f32 FLOAT,
  turb_wapc1_plwredrc2_f32 FLOAT,
  turb_wapc1_plwredsnd_f32 FLOAT,
  turb_wapc1_plwredtrm_f32 FLOAT,
  turb_wapc1_plwredturb_f32 FLOAT,

  -- Booleans
  turb_mmt1_wtf_boolean BOOLEAN,
  turb_curt_active BOOLEAN
)
TIMESTAMP(timestamp)
PARTITION BY DAY
TTL 1 WEEK;
